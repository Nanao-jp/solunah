/**
 * 共通アニメーション定義
 */

/**
 * fadeInUpアニメーションのスタイルを生成
 * @param delay 遅延時間（秒）
 * @param duration アニメーション時間（秒、デフォルト: 0.6）
 * @returns CSS animation文字列
 */
export function fadeInUp(delay: number = 0, duration: number = 0.6): string {
  return `fadeInUp ${duration}s ease-out ${delay}s both`;
}

/**
 * fadeInUpアニメーションのスタイルオブジェクトを生成
 * @param delay 遅延時間（秒）
 * @param duration アニメーション時間（秒、デフォルト: 0.6）
 * @returns React styleオブジェクト
 */
export function fadeInUpStyle(delay: number = 0, duration: number = 0.6): React.CSSProperties {
  return {
    animation: fadeInUp(delay, duration),
  };
}

/**
 * インデックスベースの遅延時間を計算
 * @param index インデックス
 * @param interval 間隔（秒、デフォルト: 0.1）
 * @returns 遅延時間（秒）
 */
export function getDelayByIndex(index: number, interval: number = 0.1): number {
  return index * interval;
}

