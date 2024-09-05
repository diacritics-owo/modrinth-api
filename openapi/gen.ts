// deno-lint-ignore-file require-await

const process = async (
  path: string,
  processor: (source: string) => Promise<string>
) => {
  const source = await Deno.readTextFile(path);
  await Deno.writeTextFile(path, await processor(source));
};

const openapi = 'openapi';
const output = '.';

const s = new Deno.Command('java', {
  args: [
    ['-jar', `${openapi}/openapi-generator.jar`, 'generate'],
    ['-c', `${openapi}/config.yaml`],
    ['-i', `${openapi}/modrinth.yaml`],
    ['-g', 'rust'],
    ['-o', output],
  ].flat(),
}).spawn();

console.log(await s.status);

for await (const entry of Deno.readDir(`${output}/src/apis`)) {
  await process(`${output}/src/apis/${entry.name}`, async (source) =>
    source // corrections for the generated code
      .replaceAll('id|slug', 'term_1')
      .replaceAll('id|username', 'term_2')
      .replaceAll('id|number', 'term_3')
      .replaceAll('models::models', 'models')
      .replaceAll('models::serde_json', 'serde_json')
      .replaceAll('data.to_string()', 'serde_json::to_string(&data).unwrap()')
  );
}

await process(`${output}/Cargo.toml`, async (source) =>
  `${source}\n${await Deno.readTextFile(`${openapi}/deps.toml`)}`.replace(
    /(?<=description = ").*(?=")/g,
    'A client library for the Modrinth API, generated with openapi-generator'
  )
);

await process(
  `${output}/src/lib.rs`,
  async (source) =>
    `${source}\n${await Deno.readTextFile(`${openapi}/tests.rs`)}`
);

await process(
  `${output}/.gitignore`,
  async (_) => `target\n.openapi-generator\ndocs\nsrc\n.travis.yml\ngit_push.sh`
);
