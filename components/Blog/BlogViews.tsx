'use client';

import { useEffect, useState } from 'react';
import { ToFaNumbers } from '@/utility/utils';

const incCounter = async (viewId: string) => {
  try {
    const response = await fetch('http://localhost:3000/api/inc-counter', {
      method: 'POST',
      body: JSON.stringify({ viewId }),
    });

    const json = await response.json();
    return json.freshView as number;
  } catch (error) {
    console.log('ERROR INCREMENTING THE VIEW COUNT FOR POST: ', error);
  }
};

const getView = async (viewId: string) => {
  try {
    const response = await fetch('http://localhost:3000/api/get-view', {
      method: 'POST',
      body: JSON.stringify({ viewId }),
    });

    const json = await response.json();
    return json.view as number;
  } catch (error) {
    console.log('ERROR GETTING THE VIEW COUNT FOR POST: ', error);
  }
};

function BlogViews({ viewId }: { viewId: string }) {
  const [viewCount, setViewCount] = useState<number | undefined>();
  useEffect(() => {
    if (!sessionStorage.getItem(viewId)) {
      incCounter(viewId)
        .then(views => {
          sessionStorage.setItem(viewId, 'true');
          if (views) {
            setViewCount(views);
          }
        })
        .catch(err => {
          console.log('ERROR IN VIEWS: ', err);
        });
    } else {
      getView(viewId).then(view => {
        if (view) {
          setViewCount(view);
        }
      });
    }
  }, [viewId]);

  return (
    <span className="text-slate-400">
      {viewCount ? ToFaNumbers(viewCount) : '...'}
    </span>
  );
}

export default BlogViews;
