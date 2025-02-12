// 数値を対応する文字列にマッピングする
export const mapValueToString = <T extends Record<number, string>>(
  valueMap: T,
  value: number
): string => {
  const entry = Object.entries(valueMap).find(
    ([key, v]) => Number(key) === value
  );
  return entry ? entry[1] : ''; // 値が見つからない場合は空文字を返す
};
