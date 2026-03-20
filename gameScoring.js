(function(global){
  const triangularSeriesByTarget={3:[1,2],6:[1,2,3],10:[1,2,3,4],15:[1,2,3,4,5],21:[1,2,3,4,5,6],28:[1,2,3,4,5,6,7]};
  const qualifiesForSeriesBonus=(rowValues,target)=>{const req=triangularSeriesByTarget[target]; if(!req) return false; const present=new Set(rowValues.filter((v)=>v!==null&&v!==0)); return req.every((v)=>present.has(v));};
  const isAllClear=(grid)=>grid.every((row)=>row.every((c)=>c===null));
  const getCascadeScore=(clearedRows)=>{const base=clearedRows*100; const bonus=clearedRows>1?(clearedRows-1)*clearedRows*50:0; return base+bonus;};
  global.GameScoring={qualifiesForSeriesBonus,isAllClear,getCascadeScore};
})(window);
