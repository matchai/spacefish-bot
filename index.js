const formatIssueClone = require("./lib/format-issue-clone.js");

/**
 * This is the entry point for your Probot App.
 * @param {import('probot').Application} app - Probot's Application class.
 */
module.exports = app => {
  app.log("Yay, spacefish-bot was loaded!");

  app.on(["issues.opened", "issues.edited"], async context => {
    const { title } = context.payload.issue;
    if (!isIssueNumber(title)) return;

    const issueNumber = getIssueNumber(title);
    context.log(`Issue/PR #${issueNumber} is being cloned`);

    const spaceshipIssue = await getSpaceshipIssue({ context, issueNumber });
    context.log(
      `Issue found: #${spaceshipIssue.data.number} ${spaceshipIssue.data.title}`
    );

    const formattedIssue = formatIssueClone({ context, issue: spaceshipIssue });
    return context.github.issues.edit(formattedIssue);
  });
};

const getIssueNumber = str => {
  const regex = /#(\d+)/.exec(str);
  return regex ? regex[1] : null;
};
const isIssueNumber = str => Boolean(getIssueNumber(str));
const getSpaceshipIssue = async ({ context, issueNumber }) => {
  const test = context.github.issues.get({
    owner: "denysdovhan",
    repo: "spaceship-prompt",
    number: issueNumber
  });
  console.log(test);
  return test;
};
