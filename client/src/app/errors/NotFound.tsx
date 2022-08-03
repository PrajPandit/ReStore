import { Button, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import Catalog from "../../features/catalog/Catalog";

export default function NotFound() {
    return (
        <Container component={Paper} sx={{height: 400}}>
            <Typography gutterBottom variant="h3">Oops - we could not find what you are looking for
            </Typography>
            <Button fullWidth component={Link} to={'/catalog'}> Go back to shop</Button>
        </Container>
    )
}