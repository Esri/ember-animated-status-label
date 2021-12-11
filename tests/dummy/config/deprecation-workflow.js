/* eslint-env browser */
self.deprecationWorkflow = self.deprecationWorkflow || {}
self.deprecationWorkflow.config = {  
  workflow: [
    { handler: 'silence', matchId: 'deprecated-run-loop-and-computed-dot-access' }  ,
    { handler: 'silence', matchId: 'this-property-fallback' },
  ]
}
