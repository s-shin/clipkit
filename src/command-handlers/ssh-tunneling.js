
export default function handler(argv) {
  process.stdout.write(`ssh -R ${argv["remote-port"]}:localhost:${argv.port} ${argv.host}`);
}
