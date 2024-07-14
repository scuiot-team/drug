import type { UserConfigExport } from "@tarojs/cli";
export default {
   logger: {
    quiet: false,
    stats: true
  },
  mini: {
    optimizeMainPackage: {
      enable: true
    }
  },
  h5: {}
} satisfies UserConfigExport
