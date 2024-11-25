import { hoursToTime, minutesToTime, secondsToTime } from '@/services/helpers/time'

// 长刻度单位
export enum LongScaleUnit {
  FRAME = 'f',
  SECOND = 's',
  MINUTE = 'm',
  HOUR = 'h',
}

export interface ScaleOptions {
  type: LongScaleUnit
  unit: number
  parts: number
  scaleWidth: number
}

/**
 * 根据帧的宽度计算出合适的刻度单位和刻度间宽度
 *
 * @param frameWidth
 * @param options.longScaleMinInterval 长刻度之间间隔的最少宽度
 * @param options.separateParts 长刻度之间需要划分多少等分
 * @returns
 */
export function generateScaleOptions(
  frameWidth: number,
  options = {
    longScaleMinInterval: 120,
    separateParts: 10,
  },
): ScaleOptions {
  const { longScaleMinInterval, separateParts } = options
  // 帧
  const frameUnits = [2, 5, 10, 15]
  for (const unit of frameUnits) {
    const w = unit * frameWidth
    if (w > longScaleMinInterval) {
      // 2 帧进行 2 等分, 5 帧进行 5 等分, 大于 10 帧进行 10 等分
      const parts = unit < separateParts ? unit : separateParts
      return {
        type: LongScaleUnit.FRAME,
        unit,
        parts,
        scaleWidth: w / parts,
      }
    }
  }

  // 秒
  const secondUnits = [1, 2, 5, 10, 20, 30]
  for (const unit of secondUnits) {
    const w = unit * 30 * frameWidth
    if (w > longScaleMinInterval) {
      return {
        type: LongScaleUnit.SECOND,
        unit,
        parts: separateParts,
        scaleWidth: w / separateParts,
      }
    }
  }

  // 分钟（每秒 30f，那么 1 分钟就是 1800f）
  const minutesUnits = [1, 2, 5, 10, 20, 30]
  for (const unit of minutesUnits) {
    const w = unit * 1800 * frameWidth
    if (w > longScaleMinInterval) {
      return {
        type: LongScaleUnit.MINUTE,
        unit,
        parts: separateParts,
        scaleWidth: w / separateParts,
      }
    }
  }

  // 小时（每秒 30f，那么 1 小时就是 108000f)
  let i = 0
  let w = 0

  do {
    i += 1
    w = i * 108000 * frameWidth
  } while (w < longScaleMinInterval)

  return {
    type: LongScaleUnit.HOUR,
    unit: i,
    parts: separateParts,
    scaleWidth: w / separateParts,
  }
}

/**
 * 获取长刻度显示的时间文字
 *
 * @param {number} index 序号
 * @param {number} level 长刻度类型值
 * @param {longScaleType} type 类型
 */
export function formatLongScaleTime(index: number, level: number, unit: LongScaleUnit): string {
  if (index === 0) return '00:00'

  if (unit === LongScaleUnit.FRAME) {
    const frames = index * level
    // 如果刚好满足秒数显示条件则进行格式化显示具体时间
    if (frames % 30 === 0) {
      return secondsToTime(frames / 30)
    }
    return `${(index * level) % 30}f`
  }

  if (unit === LongScaleUnit.SECOND) {
    return secondsToTime(index * level)
  }

  if (unit === LongScaleUnit.MINUTE) {
    return minutesToTime(index * level)
  }

  return hoursToTime(index * level)
}
