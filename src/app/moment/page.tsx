import {Button} from "@/components/ui/button";
import { Link } from 'next-view-transitions'

const Years = [2019, 2020, 2021]

const Page = () => {
    return <div className="mt-20">
        <div className="text-center text-2xl font-bold">Moments</div>
        <div className="mt-4 text-center text-lg">some moments</div>

        <div className="flex gap-4 justify-center flex-wrap mt-20">
            {
                Years.map(item => {
                    return <Link
                            href={`/moment/${item}`}
                            key={item}
                        ><Button variant="secondary" key={item}>{item}</Button>
                    </Link>
                })
            }
        </div>
    </div>
}

export default Page;