module.exports =({github, context}) => {
    const {PR_NUMBER} = process.env
    if (PR_NUMBER) {
      const prTag = `pr${PR_NUMBER}`;
      console.log(`Setting image_tag=${prTag} for pull_request`);
      core.setOutput("image_tag", prTag);
      return;
    }
    if ((context.eventName === "push" || context.eventName === "workflow_dispatch")
    && context.ref === "refs/heads/main") {
      console.log("Setting image_tag=latest for push to main");
      core.setOutput("image_tag", "latest");
      return;
    }
    core.error('Failed to set image_tag');
    console.log(context);
}