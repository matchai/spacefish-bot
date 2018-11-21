const dedent = require("dedent");

module.exports = function formatIssueClone({ context, issue }) {
  const existingIssueBody = context.payload.issue.body;
  const isPR = Boolean(issue.data.pull_request);
  let newIssueBody = dedent`
  ${existingIssueBody ? existingIssueBody + "\n\n## \n" : ""}
  > [🐟](https://github.com/matchai/spacefish-bot) **spacefish-bot** — ${
    isPR ? "Pull request" : "Issue"
  } copied from: ${issue.data.html_url}.

  ${issue.data.body}
  `;

  const issueObj = {
    title: issue.data.title,
    body: newIssueBody
  };

  return context.issue(issueObj);
};
