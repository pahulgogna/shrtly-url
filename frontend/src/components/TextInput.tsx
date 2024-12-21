function TextInput({
    lable = "",
    placeholder = "",
    value,
    setValue,
    className = "",
}: {
    lable?: string,
    placeholder?: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    className?: string,
}) {


  return (
    <div className={`mt-3`}>
        <label htmlFor={lable} className="block mb-2 text-md font-medium">{lable}</label>
        <div className='relative'>
          <input type="text" id={lable} placeholder={placeholder} className={`${className} block w-full pr-5 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-md focus:ring-blue-500 focus:border-blue-500`} onChange={(e) => {
              setValue(e.target.value)
          }} value={value}/>
        </div>
    </div>
  )
}

export default TextInput
