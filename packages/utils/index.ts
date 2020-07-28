
type targetType = string | number | boolean | symbol | object | Array<any>

/**
 * 获取允许命令的当前位置
 */
export const currentPath = () => process.cwd();




/**
 * 深克隆 对象中存在引用，JSON.stringify无法转换
 * @param target 
 * @param ref 
 */
export const deepClone = (target: targetType, ref:WeakSet<Object> = new WeakSet()):any => {
  const baseData = ["string", "number", "boolean", "symbol", "undefined"]
  let newValue;

  if (baseData.includes(typeof target)) {
    newValue = target
  } else if (target instanceof Array) {
    const cach = []
    ref.add(target)
    for (let i = 0; i < target.length; i++) {
      if (ref.has(target[i])) continue;
      const item = target[i]
      cach.push(deepClone(item, ref))
    }
    newValue = cach
  } else if (target instanceof Object) {
    let cach = {}
    ref.add(target)
    const oKeys= Object.keys(target)
    for (let i = 0; i < oKeys.length; i++) {
      const key = oKeys[i] 
      const value = (target as any)[key]  ;
      if (ref.has(value)) continue;
      (cach as any)[key] = deepClone(value, ref)
    }
    newValue = cach
  }

  return newValue;
}

