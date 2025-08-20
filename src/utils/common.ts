/** Возвращает значение куки по имени или null, если нет **/
export function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}

/**
 * Устанавливает cookie с именем name и значением value.
 * @param name
 * @param value
 * @param days срок жизни в днях (по умолчанию 30)
 */
export const setCookie = (name: string, value: string, days = 30) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires}`;
}
