import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getPublishedPosts, type BlogPost } from "@/data/blogPosts";
import { Calendar, ChevronDown, ChevronRight } from "lucide-react";
import { useRegion } from "@/contexts/RegionContext";

interface ArchiveEntry {
  year: number;
  month: string;
  monthNum: number;
  posts: BlogPost[];
}

const MONTH_NAMES_RU: { [key: string]: string } = {
  'January': 'Январь', 'February': 'Февраль', 'March': 'Март', 'April': 'Апрель',
  'May': 'Май', 'June': 'Июнь', 'July': 'Июль', 'August': 'Август',
  'September': 'Сентябрь', 'October': 'Октябрь', 'November': 'Ноябрь', 'December': 'Декабрь'
};

const BlogArchive = () => {
  const { isCentralAsia } = useRegion();
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set());

  // Parse dates and group by year/month
  const blogPosts = getPublishedPosts();

  const archive = useMemo(() => {
    const months: { [key: string]: number } = {
      'January': 1, 'February': 2, 'March': 3, 'April': 4,
      'May': 5, 'June': 6, 'July': 7, 'August': 8,
      'September': 9, 'October': 10, 'November': 11, 'December': 12
    };

    const grouped: Map<number, Map<string, typeof blogPosts>> = new Map();

    blogPosts.forEach(post => {
      const parts = post.date.split(' ');
      if (parts.length >= 3) {
        const month = parts[0];
        const year = parseInt(parts[2], 10);

        if (!grouped.has(year)) {
          grouped.set(year, new Map());
        }
        const yearMap = grouped.get(year)!;

        if (!yearMap.has(month)) {
          yearMap.set(month, []);
        }
        yearMap.get(month)!.push(post);
      }
    });

    // Convert to sorted array
    const result: { year: number; months: ArchiveEntry[] }[] = [];

    Array.from(grouped.keys())
      .sort((a, b) => b - a) // Sort years descending
      .forEach(year => {
        const yearMap = grouped.get(year)!;
        const monthEntries: ArchiveEntry[] = [];

        Array.from(yearMap.keys())
          .sort((a, b) => (months[b] || 0) - (months[a] || 0)) // Sort months descending
          .forEach(month => {
            monthEntries.push({
              year,
              month,
              monthNum: months[month] || 0,
              posts: yearMap.get(month)!
            });
          });

        result.push({ year, months: monthEntries });
      });

    return result;
  }, []);

  const toggleYear = (year: number) => {
    setExpandedYears(prev => {
      const next = new Set(prev);
      if (next.has(year)) {
        next.delete(year);
      } else {
        next.add(year);
      }
      return next;
    });
  };

  // Auto-expand the most recent year
  useMemo(() => {
    if (archive.length > 0 && expandedYears.size === 0) {
      setExpandedYears(new Set([archive[0].year]));
    }
  }, [archive]);

  if (archive.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5 text-[#C9922A]" />
        <h3 className="text-lg font-semibold text-gray-800">{isCentralAsia ? "Архив" : "Archive"}</h3>
      </div>

      <div className="space-y-2">
        {archive.map(({ year, months }) => (
          <div key={year}>
            <button
              onClick={() => toggleYear(year)}
              className="flex items-center gap-2 w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {expandedYears.has(year) ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
              <span className="font-medium text-gray-700">{year}</span>
              <span className="text-sm text-gray-500 ml-auto">
                ({months.reduce((sum, m) => sum + m.posts.length, 0)} {isCentralAsia ? "статей" : "posts"})
              </span>
            </button>

            {expandedYears.has(year) && (
              <div className="ml-6 space-y-1 mt-1">
                {months.map(({ month, posts }) => (
                  <div key={`${year}-${month}`} className="py-1 px-3">
                    <div className="text-sm text-gray-600 font-medium mb-1">
                      {isCentralAsia ? MONTH_NAMES_RU[month] || month : month} ({posts.length})
                    </div>
                    <ul className="space-y-1 ml-3">
                      {posts.map(post => (
                        <li key={post.id}>
                          <Link
                            to={`/blog/${post.slug}`}
                            className="text-sm text-gray-500 hover:text-[#C9922A] transition-colors line-clamp-1"
                          >
                            {post.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogArchive;
