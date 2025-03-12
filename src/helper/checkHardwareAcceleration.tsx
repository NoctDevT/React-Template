export function checkHardwareAcceleration(): boolean {
    try {
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      const gl = canvas.getContext('webgl') as WebGLRenderingContext | null 
               || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
  
      if (!gl) return false;
  
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string;
        return !/swiftshader|software/i.test(renderer);  
      }
  
      return true;
    } catch (e) {
      return false;
    }
  }
  