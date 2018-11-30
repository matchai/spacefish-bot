const dedent = require("dedent");

module.exports = function formatIssueClone({ context, issue }) {
  const existingIssueBody = context.payload.issue.body;

  let newIssueBody = dedent`
  ${existingIssueBody ? existingIssueBody + "\n\n## \n" : ""}
  > [🐟](https://github.com/matchai/spacefish-bot) **spacefish-bot** — ${
    isPR(issue) ? "Pull request" : "Issue"
  } copied from: ${issue.data.html_url}.

  ${convertIssueReferences(issue.data.body)}
  `;

  const issueObj = {
    title: issue.data.title,
    body: newIssueBody
  };

  return context.issue(issueObj);
};

const isPR = issue => Boolean(issue.data.pull_request);
const convertIssueReferences = body => {
  // Find issue numbers starting a new line or preceeded with whitespace
  return body.replace(
    /(^|\s)#(\d+)($|\s)/g,
    "$1denysdovhan/spaceship-prompt#$2$3"
  );
};
