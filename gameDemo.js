(function(global){
  const C=global.GAME_CONSTANTS;
  const M=global.GameModel;

  // Pure demo helper: chooses a direct-drop column by scoring simulated model states.
  const chooseDemoColumn=(gameState,evaluateMove)=>{
    const legalCols=M.getLegalDirectDropColumns(gameState);
    if(!legalCols.length) return {col:-1,score:Number.NEGATIVE_INFINITY};
    let bestCol=legalCols[0]; let bestScore=Number.NEGATIVE_INFINITY;
    legalCols.forEach((col)=>{
      const currentSim=M.simulateDirectDrop(gameState,col,gameState.queue[0]);
      const currentScore=evaluateMove(gameState,currentSim,gameState.queue[0],gameState.queue[1]);
      let combinedScore=currentScore*C.DEMO_IMMEDIATE_FACTOR;
      if(gameState.queue[1]!==undefined&&gameState.queue[1]!==null&&currentSim){
        const lookaheadState=currentSim.nextState;
        const nextLegalCols=M.getLegalDirectDropColumns(lookaheadState);
        let nextBest=Number.NEGATIVE_INFINITY;
        nextLegalCols.forEach((nextCol)=>{
          const nextSim=M.simulateDirectDrop(lookaheadState,nextCol,gameState.queue[1]);
          const nextScore=evaluateMove(lookaheadState,nextSim,gameState.queue[1],null);
          if(nextScore>nextBest) nextBest=nextScore;
        });
        if(nextBest!==Number.NEGATIVE_INFINITY) combinedScore+=nextBest*C.DEMO_LOOKAHEAD_FACTOR;
      }
      if(combinedScore>bestScore){bestScore=combinedScore; bestCol=col;}
    });
    return {col:bestCol,score:bestScore};
  };

  global.GameDemo={chooseDemoColumn};
})(window);
