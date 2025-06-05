const fs = require('fs');
const cron = require('node-cron');
const nodes = {
  httpRequest: require('./nodes/httpRequest'),
  sendEmail: require('./nodes/sendEmail'),
  fetchXhsTrends: require('./nodes/fetchXhsTrends'),
  aiGenerateContent: require('./nodes/aiGenerateContent'),
  postToXhs: require('./nodes/postToXhs')
};

const workflow = JSON.parse(fs.readFileSync('./workflow.json', 'utf-8'));

function runNode(node, input) {
  if (node.type === 'timer') return Promise.resolve(input);
  return nodes[node.type](node.config, input);
}

function findNext(nodeId) {
  return workflow.edges
    .filter(e => e.from === nodeId)
    .map(e => workflow.nodes.find(n => n.id === e.to));
}

function runWorkflow(startNode, input) {
  runNode(startNode, input).then(output => {
    const nextNodes = findNext(startNode.id);
    nextNodes.forEach(n => runWorkflow(n, output));
  });
}

// 启动定时任务
workflow.nodes
  .filter(n => n.type === 'timer')
  .forEach(timerNode => {
    cron.schedule(timerNode.config.cron, () => {
      runWorkflow(timerNode, {});
    });
  });
