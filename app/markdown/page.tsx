import BlogHeading from '@/components/Blog/BlogHeading';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'راهنمای استفاده از مارک داون در نظرات سایت',
  description:
    'این صفحه به شما روش استفاده از دستورات مارک داون در بخش نظرات این سایت را نشان می دهد.',
};

function Markdown() {
  return (
    <section className="container mx-auto max-w-[1000px] px-5 text-justify text-base leading-9">
      <div className="my-10 text-center text-4xl font-black leading-loose">
        <h1>راهنمای استفاده از مارک داون در نظرات سایت</h1>
      </div>

      <div>
        <p>
          همانطور که می دانید، می توانید در بخش نظرات این سایت از{' '}
          <Link
            href={'https://en.wikipedia.org/wiki/Markdown'}
            target="_blank"
            className="italic text-blue-500 hover:text-blue-300"
          >
            {' '}
            مارک داون{' '}
          </Link>
          استفاده کنید. از آنجایی که برخی از دستورات مارک داون در این وب سایت
          محدود شده اند (فقط زیرمجموعه ای خاص در دسترس است) این صفحه روش استفاده
          از دستورات مارک داون را به شما توضیح می دهد.
        </p>
      </div>

      <div className="mb-10">
        <BlogHeading as="h2" href="#markdown-headings">
          استفاده از سر تیتر
        </BlogHeading>
        <p>
          استفاده از دستورات سرتیتر (تگ های <code>h1</code> تا <code>h6</code>)
          ممنوع می باشد بنابراین دستور{' '}
          <code className="prose dark:text-white">#</code> قابل دسترسی نیست.
        </p>
      </div>

      <div className="mb-10">
        <BlogHeading as="h2" href="#markdown-bold">
          متن توپُر یا bold
        </BlogHeading>
        <p>
          برای توپُر کردن بخشی از متن خود باید آن را درون دستور ** قرار بدهید.
          به طور مثال **متن توپُر** به شکل{' '}
          <span className="text-base font-black">متن توپُر</span> دیده می شود.
        </p>
      </div>

      <div className="mb-10">
        <BlogHeading as="h2" href="#markdown-italic">
          متن مُوَّرب یا italic
        </BlogHeading>
        <p>
          برای مورب کردن بخشی از متن خود باید آن را درون دستور * قرار بدهید. به
          طور مثال *متن مورب* به شکل{' '}
          <span className="text-base italic">متن مورب</span> دیده می شود.
        </p>
      </div>

      <div className="mb-10">
        <BlogHeading as="h2" href="#markdown-strikethrough">
          متن خط خورده یا Strikethrough
        </BlogHeading>
        <p>
          برای اینکه بخشی از متن خود را خط خورده کنید باید از دستور ~ استفاده
          کنید. نام این کاراکتر tilde است. نحوه ی استفاده از این دستور بدین شکل
          است که باید متن مورد نظر را بین دو علامت تیلده قرار دهید.
        </p>

        <br />

        <p>~~ این متن به صورت خط خورده نمایش داده می شود ~~</p>
        <p className="line-through">
          این متن به صورت خط خورده نمایش داده می شود.
        </p>
      </div>

      <div className="mb-10">
        <BlogHeading as="h2" href="#markdown-blockquote">
          نقل قول یا blockquote
        </BlogHeading>
        <p>
          برای نقل قول (اشاره به بخش خاصی از متن مقاله) باید از دستور{' '}
          <span>&lt;</span> استفاده کنید. به طور مثال اگر این متن را در دستور
          ذکر شده قرار دهیم بدین شکل نمایش داده می شود:
        </p>

        <blockquote className="my-5 border-r-2 border-r-white bg-[#4c5155] pl-[14px] pr-[20px] text-white">
          <p className="italic">
            این یک نقل قول است که برای اشاره به قسمت های خاصی از متن استفاده می
            شود.
          </p>
        </blockquote>
      </div>

      <div className="mb-10">
        <BlogHeading as="h2" href="#markdown-lists">
          لیست های مرتب و غیر مرتب
        </BlogHeading>
        <p>
          در مارک داون (و طبیعتا HTML) دو نوع لیست وجود دارد: لیست های مرتب
          (ordered list) و لیست های غیر مرتب (unordered list). برای نمایش لیست
          های مرتب از اعداد و برای نمایش لیست های غیر مرتب از علامت خط فاصله
          استفاده کنید.
        </p>

        <p>
          به طور مثال با نوشتن{' '}
          <span className="rounded-xl bg-slate-500 p-1 text-white">
            1-عنوان یک
          </span>{' '}
          و{' '}
          <span className="rounded-xl bg-slate-500 p-1 text-white">
            2-عنوان دو
          </span>{' '}
          به صورتی که هر کدام روی یک خط قرار بگیرند می توانیم چنین نتیجه ای را
          مشاهده کنیم:
        </p>

        <ol className="prosel dark:text-white">
          <li>۱. عنوان یک</li>
          <li>۲. عنوان دو</li>
        </ol>

        <p>این مورد با دستور - برای لیست های غیر مرتب نیز صدق می کند:</p>

        <ul>
          <li>- عنوان یک</li>
          <li>- عنوان دو</li>
        </ul>
      </div>

      <div className="mb-10">
        <BlogHeading as="h2" href="#markdown-code">
          کد یا code
        </BlogHeading>
        <p>
          برای نمایش کد در کامنت خود بهتر است از دستور ``` استفاده کنید. نام این
          علامت backtick است و شما باید تمام کد خود را درون آن قرار بدهید. به
          طور مثال:
        </p>
        <pre>``` console.log(&quot;hello&quot;); ```</pre>
        <p>به صورت زیر نمایش داده می شود:</p>
        <p dir="ltr" className="rounded-xl bg-[#1b1c21] p-2 text-white">
          console.log(&quot;hello&quot;);
        </p>
      </div>

      <div className="mb-10">
        <BlogHeading as="h2" href="#markdown-horizontal-rule">
          خط عمودی یا horizontal rule
        </BlogHeading>
        <p>
          برای نمایش یک خط افقی جهت جداسازی بخشی از متن کامنت خود باید از سه
          علامت خط فاصله (---) استفاده کنید. من این کار را بین بخش اول متن و بخش
          دوم انجام داده‌ام. نتیجه به شکل زیر نمایش داده می شود:
        </p>

        <br />

        <p>بخش اول از متن</p>
        <hr className="my-3" />
        <p>بخش دوم متن</p>
      </div>

      <div className="mb-10">
        <BlogHeading as="h2" href="#markdown-links">
          لینک ها
        </BlogHeading>
        <p>
          برای نمایش یک لینک نیازی به استفاده از دستور قدیمی{' '}
          <span className="prose italic dark:prose-invert">
            [title](https://www.example.com)
          </span>{' '}
          گرچه هنوز هم پشتیبانی می شود. بهترین روش قرار دادن لینک به صورت متن
          ساده است، سپس لینک شما به صورت یک هایپر لینک نمایش داده خواهد شد.
        </p>
      </div>

      <div className="mb-10">
        <BlogHeading as="h2" href="#markdown-tables">
          جدول ها
        </BlogHeading>
        <p>برای نمایش جداول در کامنت های خود باید به شکل زیر عمل کنید:</p>
        <br />
        <p>| تیتر ۱ | تیتر ۲ |</p>
        <p>| ----------- | ----------- |</p>
        <p>| ردیف اول | توضیحات لازم |</p>
        <p>| ردیف دوم | توضیحات دوم |</p>
        <br />

        <p>با پیروی از این دستور می توانید چنین جدولی را تولید کنید:</p>
        <br />

        <table className="prose w-full text-center dark:prose-invert">
          <thead>
            <tr>
              <th>تیتر ۱</th>
              <th>تیتر ۲</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ردیف اول</td>
              <td>توضیحات لازم برای ردیف اول</td>
            </tr>
            <tr>
              <td>ردیف دوم</td>
              <td>توضیحات لازم برای ردیف دوم</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-10">
        <BlogHeading as="h2" href="#markdown-task-lists">
          لیست وظایف یا task list
        </BlogHeading>
        <p>
          برای نمایش یک لیست که قابلیت تیک خوردن داشته باشد باید از ساختار زیر
          استفاده کنید:
        </p>
        <br />
        <p>- [x] یک تسک انجام شده</p>
        <p>- [] یک تسک انجام نشده</p>

        <br />
        <p>با انجام این کار، لیست شما بدین شکل نمایش داده می شود:</p>
        <br />

        <ul className="contains-task-list">
          <li className="task-list-item">
            <input disabled type="checkbox" checked /> یک تسک انجام شده
          </li>
          <li className="task-list-item">
            <input disabled type="checkbox" /> یک تسک انجام نشده
          </li>{' '}
        </ul>
      </div>

      <div className="mb-10">
        <BlogHeading as="h2" href="#markdown-task-lists">
          جمع بندی
        </BlogHeading>

        <p>
          امیدوارم با استفاده از این دستورات کامنت های خوانا و بهتری را به
          یادگار بگذارید!
        </p>
      </div>
    </section>
  );
}

export default Markdown;
