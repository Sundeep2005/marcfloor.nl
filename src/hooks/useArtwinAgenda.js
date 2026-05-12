import { useEffect, useState } from 'react';

export function useArtwinAgenda(widgetUrl) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(Boolean(widgetUrl));

  useEffect(() => {
    if (!widgetUrl) {
      setEvents([]);
      setIsLoading(false);
      return undefined;
    }

    let cancelled = false;

    async function loadAgenda() {
      try {
        const separator = widgetUrl.includes('?') ? '&' : '?';
        const response = await fetch(`${widgetUrl}${separator}_=${Date.now()}`, { cache: 'no-store' });
        const html = await response.text();
        const parsedEvents = parseArtwinEvents(html);

        if (!cancelled) {
          setEvents(parsedEvents);
        }
      } catch (error) {
        if (!cancelled) {
          setEvents([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadAgenda();
    const interval = window.setInterval(loadAgenda, 60000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [widgetUrl]);

  return { events, isLoading };
}

function parseArtwinEvents(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const rows = Array.from(doc.querySelectorAll('[itemscope][itemtype="http://schema.org/MusicEvent"]'));

  return rows.map((row, index) => {
    const location = cleanText(row.querySelector('.awl-where')?.textContent);
    const [venue = '', city = ''] = location.split(',').map((part) => part.trim());
    const detailNodes = Array.from(row.querySelectorAll('.awl-list-detail'));
    const title = cleanText(row.querySelector('.awl-list-detail2')?.textContent || row.querySelector('meta[itemprop="name"]')?.content);
    const note = cleanText(
      detailNodes
        .map((node) => cleanText(node.textContent))
        .find((text) => text && text !== title && text !== location),
    );

    return {
      weekday: cleanText(row.querySelector('.awl-text-day')?.textContent).toUpperCase(),
      day: cleanText(row.querySelector('.awl-number-date')?.textContent),
      month: cleanText(row.querySelector('.awl-text-month')?.textContent).toUpperCase(),
      time: cleanText(row.querySelector('.awl-text-time')?.textContent),
      title,
      venue,
      city,
      note,
      dateTime: row.querySelector('meta[itemprop="startDate"]')?.content || `${index}`,
    };
  });
}

function cleanText(value = '') {
  return value.replace(/\s+/g, ' ').trim();
}

