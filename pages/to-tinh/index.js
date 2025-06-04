import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import dynamic from 'next/dynamic';

// Dynamically import p5.js to avoid SSR issues
const P5 = dynamic(() => import('p5'), { ssr: false });

const Jansharenoidung = [
  "Yêu em nhiều lắm",
  "Luôn nhớ em",
  "Em là tất cả",
  "Yêu em /",
  "Bên em là đủ",
  "Anh cần em",
  "Vì em, anh tồn tại",
  "Em là định mệnh",
  "Chỉ yêu mỗi mình em",
];

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Initialize p5.js
    let sketchInstance = null;
    import('p5').then((p5) => {
      const sketch = (p) => {
        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current);
          p.textAlign(p.CENTER, p.CENTER);
          p.textSize(24);
        };

        p.draw = () => {
          p.background(0); // Black background
          p.fill(255); // White text
          const index = Math.floor(p.frameCount / 100) % Jansharenoidung.length;
          p.text(Jansharenoidung[index], p.width / 2, p.height / 2);
        };

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
      };

      sketchInstance = new p5(sketch, canvasRef.current);
    });

    // Cleanup p5.js instance on component unmount
    return () => {
      if (sketchInstance) {
        sketchInstance.remove();
      }
    };
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Romantic Text Animation</title>
      </Head>
      <div className="min-h-screen bg-black overflow-hidden">
        {/* Canvas for external scripts or p5.js */}
        <canvas id="myCanvas" className="block w-full h-full" ref={canvasRef}></canvas>
        <noscript>
          <p className="text-white text-center">
            Please enable JavaScript to view the animation.
          </p>
        </noscript>
        {/* Sample blog content inspired by Blogger XML */}
        <div className="container mx-auto p-4 text-white">
          <h1 className="text-2xl font-bold mb-4">Welcome to My Blog</h1>
          <div className="post">
            <h2 className="text-xl">Sample Post</h2>
            <p>This is a sample blog post to mimic the Blogger template structure.</p>
          </div>
        </div>
      </div>
      {/* Load external scripts */}
      <Script
        src="https://cdn.jsdelivr.net/gh/nhaccuahuong/js@main/chukhonggian.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/gh/nhaccuahuong/js@main/jschuchay.js"
        strategy="afterInteractive"
      />
      {/* Pass Jansharenoidung to global scope */}
      <Script id="jansharenoidung-script" strategy="beforeInteractive">
        {`window.Jansharenoidung = ${JSON.stringify(Jansharenoidung)};`}
      </Script>
    </>
  );
}