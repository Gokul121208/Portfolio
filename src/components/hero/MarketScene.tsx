"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type Palette = { up: THREE.Color; down: THREE.Color; a: THREE.Color; b: THREE.Color };

function readPalette(): Palette {
  const cs = getComputedStyle(document.documentElement);
  const c = (v: string) => new THREE.Color(cs.getPropertyValue(v).trim() || "#c6ff3d");
  return { up: c("--accent"), down: c("--accent-3"), a: c("--accent-2"), b: c("--accent") };
}

function usePalette() {
  const [p, setP] = useState<Palette | null>(null);
  useEffect(() => {
    setP(readPalette());
    const mo = new MutationObserver(() => setP(readPalette()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);
  return p;
}

const f = (x: number, t: number) =>
  Math.sin(x * 0.35 + t * 0.6) * 1.6 + Math.sin(x * 0.9 - t * 0.9) * 0.7 + Math.sin(x * 0.12 + t * 0.2) * 1.1;

function Candles({ count, palette }: { count: number; palette: Palette }) {
  const body = useRef<THREE.InstancedMesh>(null!);
  const wick = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const col = useMemo(() => new THREE.Color(), []);
  const spacing = 0.62;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const x = (i - count / 2) * spacing;
      const o = f(x, t);
      const c = f(x + 0.45, t + 0.35);
      const hi = Math.max(o, c) + 0.25 + Math.abs(Math.sin(i * 12.9898)) * 0.5;
      const lo = Math.min(o, c) - 0.25 - Math.abs(Math.cos(i * 78.233)) * 0.5;
      const h = Math.max(Math.abs(c - o), 0.06);
      dummy.position.set(x, (o + c) / 2 - 0.4, 0);
      dummy.scale.set(0.34, h, 0.34);
      dummy.updateMatrix();
      body.current.setMatrixAt(i, dummy.matrix);
      dummy.position.set(x, (hi + lo) / 2 - 0.4, 0);
      dummy.scale.set(0.04, hi - lo, 0.04);
      dummy.updateMatrix();
      wick.current.setMatrixAt(i, dummy.matrix);
      col.copy(c >= o ? palette.up : palette.down);
      body.current.setColorAt(i, col);
      wick.current.setColorAt(i, col);
    }
    body.current.instanceMatrix.needsUpdate = true;
    wick.current.instanceMatrix.needsUpdate = true;
    if (body.current.instanceColor) body.current.instanceColor.needsUpdate = true;
    if (wick.current.instanceColor) wick.current.instanceColor.needsUpdate = true;
  });

  return (
    <group position={[3.2, -3.0, 0]}>
      <instancedMesh ref={body} args={[undefined, undefined, count]}>
        <boxGeometry />
        <meshBasicMaterial toneMapped={false} transparent opacity={0.75} />
      </instancedMesh>
      <instancedMesh ref={wick} args={[undefined, undefined, count]}>
        <boxGeometry />
        <meshBasicMaterial toneMapped={false} transparent opacity={0.6} />
      </instancedMesh>
    </group>
  );
}

function Ribbon({ y, z, speed, amp, color, opacity }: { y: number; z: number; speed: number; amp: number; color: THREE.Color; opacity: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null!);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uColor: { value: new THREE.Color() }, uAmp: { value: amp }, uSpeed: { value: speed }, uOpacity: { value: opacity } }),
    [amp, speed, opacity],
  );
  useFrame(({ clock }) => {
    mat.current.uniforms.uTime.value = clock.elapsedTime;
    mat.current.uniforms.uColor.value.copy(color);
  });
  return (
    <mesh position={[0, y, z]}>
      <planeGeometry args={[28, 1.6, 160, 1]} />
      <shaderMaterial
        ref={mat}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime; uniform float uAmp; uniform float uSpeed;
          varying vec2 vUv;
          void main(){
            vUv = uv;
            vec3 p = position;
            float w = sin(p.x*0.35 + uTime*uSpeed)*uAmp + sin(p.x*0.9 - uTime*uSpeed*1.4)*uAmp*0.4;
            p.y += w + (uv.y-0.5)*sin(p.x*0.5+uTime*uSpeed)*0.6;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0);
          }`}
        fragmentShader={`
          uniform vec3 uColor; uniform float uOpacity; varying vec2 vUv;
          void main(){
            float edge = smoothstep(0.0,0.5,vUv.y)*smoothstep(1.0,0.5,vUv.y);
            float fade = smoothstep(0.0,0.15,vUv.x)*smoothstep(1.0,0.85,vUv.x);
            gl_FragColor = vec4(uColor, edge*fade*uOpacity);
          }`}
      />
    </mesh>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null!);
  const { pointer } = useThree();
  useFrame(() => {
    g.current.rotation.y += (pointer.x * 0.12 - g.current.rotation.y) * 0.04;
    g.current.rotation.x += (-pointer.y * 0.06 - g.current.rotation.x) * 0.04;
  });
  return <group ref={g}>{children}</group>;
}

export default function MarketScene() {
  const palette = usePalette();
  const [visible, setVisible] = useState(true);
  const wrap = useRef<HTMLDivElement>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(window.innerWidth < 768);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden>
      {palette && (
        <Canvas
          dpr={[1, mobile ? 1 : 1.5]}
          frameloop={visible ? "always" : "never"}
          camera={{ position: [0, 0, mobile ? 14 : 11], fov: 55 }}
          gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
        >
          <Rig>
            <Ribbon y={-0.2} z={-1.5} speed={0.5} amp={0.9} color={palette.a} opacity={0.5} />
            <Ribbon y={-1.4} z={-0.5} speed={0.7} amp={0.7} color={palette.b} opacity={0.35} />
            <Ribbon y={-2.8} z={-2} speed={0.4} amp={1.1} color={palette.down} opacity={0.3} />
            <Candles count={mobile ? 26 : 46} palette={palette} />
          </Rig>
        </Canvas>
      )}
    </div>
  );
}
