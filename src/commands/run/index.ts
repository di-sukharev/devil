import { intro, note, outro } from "@clack/prompts";
import { command } from "cleye";
import { call } from "../../utils/call";
import { outroError, outroSuccess } from "../../utils/outro";
import { COMMANDS } from "../types";

async function getTechnicalRequirements() {}
async function askClarificationQuestions() {}
async function getProjectContext() {
  // use grep, find, ls, cd, like a human swe would
}
async function agreeOnProjectTasksAndRoadmap() {
  // todo: order by priority as per roadmap
}
async function discussImplementation() {
  await thinkOfFewImplementations();
  await considerBestImplementation();
  await discussImplementationWithUser();
}

async function splitImplementationIntoSubtasks() {
  splitTaskInSubtask();
}

async function splitSubtaskInImplementationSteps() {
  splitTaskInSubtask();
}

export const runCommand = command(
  {
    name: COMMANDS.run,
    // parameters: ["<mode>", "<key=values...>"],
  },
  async (argv) => {
    intro("Welcome 🏴‍☠️");

    // TODO: check latest package version and advise to upgrade
    // TODO: check is initialized

    const requirements = await getTechnicalRequirements();
    const projectContext = await getProjectContext();

    const tasks = await agreeOnProjectTasksAndRoadmap(
      requirements,
      projectContext
    );

    for (const task of tasks) {
      outro("Starting task");

      const subtasks = await splitTaskIntoSubtasks(task);
      for (const subtask of subtasks) {
        outro("Starting subtask");

        const clarificationsFromUser = await askClarificationQuestions(subtask);
        const googling = await searchInternet(subtask);

        const implementation = await discussImplementation(
          subtask,
          googling,
          clarificationsFromUser
        );

        const testCases = await comeUpWithTestCases(implementation);

        const tests = await generateTests(testCases);

        await writeCodeUntilTestsAreSolved(tests); // https://github.com/di-sukharev/AI-TDD

        outroSuccess("Finished subtask 🏴‍☠️");
      }

      outroSuccess("Finished task 🏴‍☠️");
    }

    outroSuccess("Finished all tasks 🏴‍☠️");
  }
);
