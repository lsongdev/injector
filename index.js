/**
 * getParameterNames
 * @param {*} fn 
 */
function getParameterNames(fn){
  const COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  const code = fn.toString().replace(COMMENTS, '');
  const arrowIndex = code.indexOf('=>');
  const parenLeftIndex = code.indexOf('(');
  const parenRightIndex = code.indexOf(')');
  const parenLess = (!fn.prototype && ~arrowIndex && (
    parenLeftIndex === -1 || // a => a
    parenLeftIndex > arrowIndex // a => (1+2)
  ));
  var parameter = parenLess ?
    code.slice(0, arrowIndex) : // single parameter
    code.slice(parenLeftIndex+1, parenRightIndex);
  if(parenLess && ~parameter.trim().indexOf(' ')) 
    parameter = parameter.split(' ')[1]; // async a
  return parameter.match(/([^\s,]+)/g) || [];
};

/**
 * Injector
 * @param {*} obj 
 */
function Injector(obj){
  var services = {};
  function get(name){
    if(!(name in services)){
      const err = new Error(`[injector] service "${name}" not found`);
      err.code = 'ERR_INJECTOR_SERVICE_NOT_FOUND';
      err.service = name;
      return Promise.reject(err);
    }
    return services[name];
  };
  if(typeof obj === 'object')
    services = obj;
  if(typeof obj === 'function')
    get = obj;
  function resolve(name) {
    let service = get(name);
    if(typeof service === 'function')
      service = invoke(service);
    return service;
  };
  function invoke(fn, that){
    return Promise
    .all(getParameterNames(fn).map(resolve))
    .then(params => fn.apply(that, params));
  }
  return invoke;
};

Injector.getParameterNames = getParameterNames;

module.exports = Injector;
