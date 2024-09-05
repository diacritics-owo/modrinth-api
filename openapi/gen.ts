const openapi = 'openapi';
const output = 'generated';

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
  const path = `${output}/src/apis/${entry.name}`;
  const source = await Deno.readTextFile(path);
  await Deno.writeTextFile(
    path,
    source // corrections for the generated code
      .replaceAll('id|slug', 'term_1')
      .replaceAll('id|username', 'term_2')
      .replaceAll('id|number', 'term_3')
      .replaceAll('models::models', 'models')
      .replaceAll('models::serde_json', 'serde_json')
      .replaceAll('data.to_string()', 'serde_json::to_string(&data).unwrap()')
  );
}
