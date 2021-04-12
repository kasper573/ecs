export class Countdown {
  startTime = new Date();
  endTime = new Date();

  get isActive() {
    const now = new Date();
    return now >= this.startTime && now < this.endTime;
  }

  get timeLeft() {
    return this.endTime.getTime() - new Date().getTime();
  }

  async start(durationMs: number) {
    this.startTime = new Date();
    this.endTime = new Date(Date.now() + durationMs);
    return new Promise((resolve) => setTimeout(resolve, durationMs));
  }

  onInterval(resolutionMs: number, callback: (timeLeft: number) => any) {
    return setInterval(
      () => this.isActive && callback(this.timeLeft),
      resolutionMs
    );
  }
}
