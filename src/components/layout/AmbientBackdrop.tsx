export default function AmbientBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] min-h-full overflow-hidden bg-[#020202]"
      aria-hidden="true"
    >
      <div
        className="absolute -right-[25%] -top-[15%] h-[min(90vh,900px)] w-[min(95vw,900px)] rounded-full opacity-[0.96]"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(16, 16, 18, 0.97) 0%, rgba(6, 6, 7, 0.94) 35%, rgba(2, 2, 3, 0.88) 55%, transparent 78%)",
          filter: "blur(72px)",
        }}
      />
      <div
        className="absolute -bottom-[20%] -left-[30%] h-[min(85vh,820px)] w-[min(95vw,880px)] rounded-full opacity-[0.95]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(12, 12, 14, 0.97) 0%, rgba(4, 4, 5, 0.93) 40%, rgba(2, 2, 2, 0.85) 62%, transparent 82%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute left-[5%] top-[25%] h-[min(65vh,620px)] w-[min(75vw,680px)] rounded-full opacity-[0.88]"
        style={{
          background:
            "radial-gradient(circle at 55% 45%, rgba(22, 22, 24, 0.8) 0%, rgba(8, 8, 10, 0.88) 45%, transparent 72%)",
          filter: "blur(64px)",
        }}
      />
      <div
        className="absolute right-[8%] top-[45%] h-[min(55vh,540px)] w-[min(65vw,600px)] rounded-full opacity-[0.82]"
        style={{
          background:
            "radial-gradient(circle at 45% 55%, rgba(18, 18, 20, 0.75) 0%, rgba(6, 6, 8, 0.9) 50%, transparent 75%)",
          filter: "blur(58px)",
        }}
      />
      <div
        className="absolute left-1/2 top-[60%] h-[min(70vh,640px)] w-[min(90vw,820px)] -translate-x-1/2 rounded-full opacity-[0.78]"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 50%, rgba(26, 26, 28, 0.65) 0%, rgba(10, 10, 12, 0.82) 48%, transparent 76%)",
          filter: "blur(68px)",
        }}
      />
      {/* Dark green smoke wisps */}
      <div
        className="absolute -left-[10%] top-[8%] h-[min(48vh,420px)] w-[min(55vw,480px)] rounded-full opacity-[0.55]"
        style={{
          background:
            "radial-gradient(circle at 45% 50%, rgba(12, 42, 28, 0.65) 0%, rgba(8, 28, 18, 0.4) 40%, transparent 70%)",
          filter: "blur(52px)",
        }}
      />
      <div
        className="absolute right-[2%] top-[32%] h-[min(40vh,360px)] w-[min(48vw,400px)] rounded-full opacity-[0.48]"
        style={{
          background:
            "radial-gradient(circle at 55% 45%, rgba(14, 48, 32, 0.6) 0%, rgba(6, 22, 14, 0.35) 45%, transparent 72%)",
          filter: "blur(46px)",
        }}
      />
      <div
        className="absolute left-[18%] top-[55%] h-[min(52vh,440px)] w-[min(60vw,520px)] rounded-full opacity-[0.5]"
        style={{
          background:
            "radial-gradient(circle at 40% 55%, rgba(10, 36, 24, 0.7) 0%, rgba(5, 20, 12, 0.38) 42%, transparent 68%)",
          filter: "blur(58px)",
        }}
      />
      <div
        className="absolute -right-[8%] top-[72%] h-[min(44vh,380px)] w-[min(52vw,440px)] rounded-full opacity-[0.42]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(16, 52, 34, 0.55) 0%, rgba(8, 30, 18, 0.3) 48%, transparent 74%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute left-[40%] top-[15%] h-[min(35vh,300px)] w-[min(40vw,340px)] rounded-full opacity-[0.38]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(18, 56, 38, 0.5) 0%, rgba(10, 34, 22, 0.28) 50%, transparent 72%)",
          filter: "blur(44px)",
        }}
      />
      <div
        className="absolute left-[8%] top-[88%] h-[min(42vh,360px)] w-[min(50vw,420px)] rounded-full opacity-[0.45]"
        style={{
          background:
            "radial-gradient(circle at 55% 40%, rgba(12, 40, 26, 0.62) 0%, rgba(6, 24, 16, 0.32) 44%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />
      <div
        className="absolute right-[28%] top-[5%] h-[min(38vh,340px)] w-[min(45vw,400px)] rounded-full opacity-[0.52]"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(8, 32, 20, 0.72) 0%, rgba(4, 18, 10, 0.42) 38%, transparent 68%)",
          filter: "blur(54px)",
        }}
      />
      <div
        className="absolute left-[35%] top-[42%] h-[min(46vh,400px)] w-[min(58vw,500px)] rounded-full opacity-[0.46]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 48% 50%, rgba(11, 38, 25, 0.68) 0%, rgba(6, 22, 14, 0.36) 45%, transparent 72%)",
          filter: "blur(56px)",
        }}
      />
      <div
        className="absolute -left-[5%] top-[48%] h-[min(50vh,440px)] w-[min(58vw,520px)] rounded-full opacity-[0.5]"
        style={{
          background:
            "radial-gradient(circle at 60% 45%, rgba(9, 34, 22, 0.7) 0%, rgba(5, 18, 11, 0.4) 42%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute right-[12%] top-[58%] h-[min(48vh,420px)] w-[min(55vw,480px)] rounded-full opacity-[0.44]"
        style={{
          background:
            "radial-gradient(circle at 42% 52%, rgba(14, 44, 30, 0.64) 0%, rgba(7, 26, 16, 0.34) 46%, transparent 71%)",
          filter: "blur(52px)",
        }}
      />
      <div
        className="absolute left-[65%] top-[22%] h-[min(36vh,320px)] w-[min(42vw,380px)] rounded-full opacity-[0.4]"
        style={{
          background:
            "radial-gradient(circle at 50% 48%, rgba(10, 36, 23, 0.66) 0%, rgba(5, 20, 12, 0.36) 44%, transparent 69%)",
          filter: "blur(48px)",
        }}
      />
      <div
        className="absolute left-[25%] top-[95%] h-[min(38vh,340px)] w-[min(48vw,440px)] -translate-y-1/2 rounded-full opacity-[0.48]"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(13, 42, 28, 0.6) 0%, rgba(6, 24, 15, 0.33) 43%, transparent 73%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute right-[35%] top-[82%] h-[min(44vh,380px)] w-[min(56vw,500px)] rounded-full opacity-[0.43]"
        style={{
          background:
            "radial-gradient(ellipse 65% 70% at 50% 45%, rgba(8, 30, 19, 0.68) 0%, rgba(4, 16, 10, 0.38) 47%, transparent 74%)",
          filter: "blur(58px)",
        }}
      />

      {/* Light reflections — subtle bright green glints */}
      <div
        className="absolute left-[22%] top-[12%] h-[min(18vh,160px)] w-[min(22vw,200px)] rounded-full opacity-[0.18]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(45, 216, 132, 0.35) 0%, rgba(45, 216, 132, 0.08) 40%, transparent 65%)",
          filter: "blur(32px)",
        }}
      />
      <div
        className="absolute right-[15%] top-[38%] h-[min(14vh,130px)] w-[min(18vw,160px)] rounded-full opacity-[0.15]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(80, 255, 160, 0.3) 0%, rgba(45, 216, 132, 0.06) 45%, transparent 68%)",
          filter: "blur(28px)",
        }}
      />
      <div
        className="absolute left-[55%] top-[62%] h-[min(16vh,140px)] w-[min(20vw,180px)] rounded-full opacity-[0.16]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(45, 216, 132, 0.32) 0%, rgba(61, 106, 80, 0.1) 42%, transparent 66%)",
          filter: "blur(30px)",
        }}
      />
      <div
        className="absolute left-[5%] top-[78%] h-[min(12vh,110px)] w-[min(16vw,140px)] rounded-full opacity-[0.14]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(80, 255, 160, 0.28) 0%, transparent 60%)",
          filter: "blur(24px)",
        }}
      />

      {/* Dark veil */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 30%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 60%, rgba(0, 0, 0, 0.92) 100%)",
        }}
      />
    </div>
  );
}
