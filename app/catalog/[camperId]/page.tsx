type CamperDetailsPageProps = {
  params: Promise<{
    camperId: string;
  }>;
};

export default async function CamperDetailsPage({
  params,
}: CamperDetailsPageProps) {
  const { camperId } = await params;

  return <main>Camper details page for {camperId}</main>;
}
