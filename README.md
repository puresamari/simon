# SIMONLANG

Hi my name is `SIMON` and this is a language I'm developing for fun.

## Usage

### CLI

This is the makeshi(f)t cli for this compiler. To use it you need to either

#### Running the compiler
- (RECOMMENDED) directly run it with ts-node `ts-node simonlang __FILENAME__.simon`
- compile it using tsc `tsc simonlang ...` and then use the compiled js to run the `.simon` file like `node simonlang __FILENAME__.simon`

#### Flags
- `--output __FILENAME AND PATH__`  if you want to comile it to js

# Languagedefinitions
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

Thanks for stopping by and have a great day

!!!! SIMON !!!!