/**
 * 時間関連の定数
 */

// 時間帯の定義
export const NORMAL_TIME_START = 5; // 通常時間開始（時）
export const NORMAL_TIME_END = 22; // 通常時間終了（時）

// 年末年始の期間
export const NEW_YEAR_START_MONTH = 12;
export const NEW_YEAR_START_DAY = 30;
export const NEW_YEAR_END_MONTH = 1;
export const NEW_YEAR_END_DAY = 3;

/**
 * 年末年始期間かどうかを判定
 */
export function isNewYearPeriod(date: Date): boolean {
  const month = date.getMonth() + 1; // getMonth()は0から始まるため+1
  const day = date.getDate();

  // 12月30日～12月31日
  if (month === NEW_YEAR_START_MONTH && day >= NEW_YEAR_START_DAY) {
    return true;
  }

  // 1月1日～1月3日
  if (month === NEW_YEAR_END_MONTH && day <= NEW_YEAR_END_DAY) {
    return true;
  }

  return false;
}

