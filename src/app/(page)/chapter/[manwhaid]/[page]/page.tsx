
import ChapterPage from "./ChapterPage";

export default async function Page({
    params
}: {
    params: Promise<{ manwhaid: string, page: string }>
}) {

    const { manwhaid, page } = await params;

    return <ChapterPage manwhaid={manwhaid} page={page} />;
}
