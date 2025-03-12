export function checkHardwareAcceleration(): boolean {
    try {
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      return !!window.WebGLRenderingContext && (
        canvas.getContext('webgl') !== null || canvas.getContext('experimental-webgl') !== null
      );
    } catch (e) {
      return false;
    }
  }
  