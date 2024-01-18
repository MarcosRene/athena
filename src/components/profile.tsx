export function Profile() {
  return (
    <div className="flex items-center gap-8">
      <div className="hidden sm:flex flex-col items-end gap-1">
        <span>Marcos Renê</span>
        <span className="text-gray-500 text-[1.4rem]">
          marcosrenedev@gmail.com
        </span>
      </div>

      <img
        className="inline-block h-[4.8rem] w-[4.8rem] rounded-full"
        src="https://avatars.githubusercontent.com/MarcosRene"
        alt=""
      />
    </div>
  )
}
