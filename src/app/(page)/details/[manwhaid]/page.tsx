import DetailsPage from "./DetailsPage";

export default async function Page({
    params
}: {
    params: Promise<{ manwhaid: string }>
}) {

    const { manwhaid } = await params;

    return <DetailsPage manwhaid={manwhaid} />;
}
