# SIMONLANG

Hi my name is `SIMON` and this is a language I'm developing for fun.

# Language
- Each line is declared with `simon` (the `simon indicator`) in the beginning
  - For example `simon says ...` or `simon declares ...`
- Declarations:
  - Primitive variables
    - `Numbers` are written like in JS
    - `Booleans` are written by `yes` and `no` or `true` and `false`
    - `Strings` are written by just writing text like `Simon is great` === "Simon is great".
  - A declaration is done by writing "`declares`" after the simon indicator and the variable name after (can be multiple words). After the variable name you can either write "`is`" or "`are`" for better semantics followed by the assigned value.
    - For example:
      - `simon declares simons skill is 100` (var simons_skill = 100)
      - `simon declares simons cant do it is no` (var simons_skill = 100)
      - `simon declares peanut butter sandwiches are great` (var peanut_butter_sandwiches = "great")
  - Commands
    - Printing is done by writing "`says`" after the simon indicator
      - Example with primitive string: `simon says hello world` (console.log("hello world"))
      - Example with before mentioned variable "`simons skill`": `simon says simons skill` (console.log(simons_skill))

Examples can be found in examples/... and their compiled counterparts are in dist/...

# CLI

Once the `simonlang` cli is installed you can use the cli.

## Compiling
    simonlang [compile] FILENAME [-p, --print] [-o, --output OUTPUT_FILENAME] 
To compile `.simon` files into `.js` just run the `compile`. Writing `compile` is optional since its the clis default command.
- `$ simonlang compile test.simon`
- `$ simonlang example/throw-error.simon`

### Options

- `[-o, --output OUTPUT_FILENAME]` Path to write the compiled js file
  - `$ simonlang example/throw-error.simon -o dist/throw-error.js`
  - `$ simonlang index.simon --output dist/index.js`
- `[-p, --print]` Print the compiled contents to the console (for testing)
  - `$ simonlang example/throw-error.simon -p`
  - `$ simonlang example/throw-error.simon -p -o dist/throw-error.js`

Thanks for stopping by and have a great day

!!!! SIMON !!!!