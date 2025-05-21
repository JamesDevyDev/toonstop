import HomePage from "./HomePage";

export default async function Page({
    params
}: {
    params: Promise<{ page: string }>
}) {

    const { page } = await params;

    return <HomePage page={page} />;
}
