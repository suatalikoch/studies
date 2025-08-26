export default function Notification() {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-md outline outline-black/5 dark:bg-gray-800">
      <span className="inline-flex shrink-0 rounded-full border border-pink-300 bg-pink-100 p-2 dark:border-pink-300/10 dark:bg-pink-400/10">
        <svg className="size-6 stroke-pink-700 dark:stroke-pink-500"></svg>
      </span>
      <div>
        <p className="text-gray-700 dark:text-gray-400">
          <span className="font-medium text-gray-950 dark:text-white">
            Tom Watson
          </span>
          mentioned you in
          <span className="font-medium text-gray-950 dark:text-white">
            Logo redesign
          </span>
        </p>
        <time className="mt-1 block text-gray-500" dateTime="9:37">
          9:37am
        </time>
      </div>
    </div>
  );
}
