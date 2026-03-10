import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, "../../"),
  webpack: (config, { webpack }) => {
    // @stacks/connect ships with SES (lockdown) which freezes JS intrinsics and
    // breaks webpack's module system in production builds. Replace the lockdown
    // module with a no-op so SES never runs inside the Next.js bundle.
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /lockdown-install\.js/,
        (resource: { request: string }) => {
          resource.request = "data:text/javascript,// ses lockdown disabled";
        }
      )
    );
    return config;
  },
};

export default nextConfig;
