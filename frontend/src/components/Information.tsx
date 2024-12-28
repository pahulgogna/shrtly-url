import { ChartArea, Link2, ShieldCheck } from "lucide-react"

function Information() {
  return (
    <div className='w-full flex justify-center text-slate-600 text-lg md:text-xl font-semibold py-16'>
        <div>
            <div className='text-slate-800 text-xl md:text-2xl font-bold my-1 mt-10'>
                Quick and easy URL shortening!
            </div>
            <div className='text-justify'>
                Shrtly allows you to easily shorten links from any website or platform. Just paste your long URL, click "Shrink," and instantly receive your shortened link. Share it on websites, in chats, or via email. Plus, track the performance of your link with detailed analytics, including click counts over time.
            </div>

            <div className='text-slate-800 text-xl md:text-2xl font-bold my-1 mt-10'>
                Shorten, share, and monitor your links effortlessly!
            </div>
            <div className='text-justify'>
                Use your shortened URLs across publications, documents, ads, blogs, forums, and messages. Keep track of your business or project performance with our click counter, providing real-time insights into the number of hits your shortened links receive.
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 text-center gap-8 mt-16 text-lg font-normal">

                    <div>
                        <div className="flex justify-center my-6">
                            <ShieldCheck className="h-24 w-24"/>
                        </div>
                        <div>
                            We prevent spam and malicious links to ensure a safe browsing experience.
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-center my-6">
                            <Link2 className="h-24 w-24"/>
                        </div>
                        
                        <div>
                            Easily shorten your URLs with just one click, regardless of their length.
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-center my-6">
                            <ChartArea className="h-24 w-24"/>
                        </div>
                        
                        <div>
                            Utilize our advanced monitoring tools to track your URL performance over time.
                        </div>
                    </div>

            </div>

        </div>
    </div>
  )
}

export default Information
