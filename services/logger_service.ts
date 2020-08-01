import * as Colors from "https://deno.land/std/fmt/colors.ts";

export class Logger {
  log(info: string, input: any) {
    console.log(`**********{ ${info} }**********\n`, input);
  }
  info(info: string, input: any) {
    console.info(Colors.blue(`**********{  ${info}  }**********\n`), input);
  }
  warn(info: string, input: any) {
    console.warn(
      Colors.yellow(
        `**********{ WARNING }**********\n**********{  ${info}  }**********\n`,
      ),
      input,
    );
  }

  error(input: any) {
    console.error(Colors.red("**********{ ERROR! }**********\n"), input);
  }

  success(info: string, input: any) {
    console.warn(
      Colors.green(
        `**********{ SUCCESS! }**********\n**********{ ${info} }**********\n`,
      ),
      input,
    );
  }
}
