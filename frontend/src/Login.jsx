import { Grid, Text, Card, Row, Button, Spacer } from "@nextui-org/react";

export default function Login() {
  return (
    <>
      <Spacer y={11} />
      <Grid.Container gap={2} justify="center">
        <Grid xs={4}>
          <Card css={{ mw: "330px" }}>
            <Text h4>SimpleBlog</Text>
            <Text>🚀 Simple Blog with React.</Text>
            <Card.Footer>
              <Row justify="flex-end">
                <Button size="sm" light>
                  View Blog
                </Button>
                <Button onClick={() => { window.location.replace(`${process.env.REACT_APP_API_URL}/auth/github`) }} size="sm">Login with Github</Button>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
    </>
  );
}
