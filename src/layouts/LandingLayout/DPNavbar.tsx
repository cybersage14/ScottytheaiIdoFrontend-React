import { AppBar, Button, Link, Stack, Toolbar } from "@mui/material";
import { Link as ScrollLink } from 'react-scroll';
import { SCOTTY_CHAT_URL, SCROLL_LINKS, THIRD_PARTY_LINKS } from "../../utils/constants";

export default function DPNavbar() {
  return (
    <AppBar>
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          {SCROLL_LINKS.map(scrollLink => (
            <Button key={scrollLink.id} variant="text" sx={{ fontWeight: 500, fontSize: { sm: 14, md: 20 } }}>
              <ScrollLink
                to={scrollLink.to}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                {scrollLink.label}
              </ScrollLink>
            </Button>
          ))}
          {THIRD_PARTY_LINKS.map(thirdPartyLink => (
            <Button
              key={thirdPartyLink.id}
              variant="text"
              sx={{ fontWeight: 500, fontSize: { sm: 14, md: 20 } }}
              component={Link}
              href={thirdPartyLink.href}
              target="_blank"
            >
              {thirdPartyLink.label}
            </Button>
          ))}
        </Stack>

        <Button
          variant="contained"
          component={Link}
          sx={{ borderRadius: 9999, px: 4, fontSize: { xs: 14, md: 18 } }}
          href={SCOTTY_CHAT_URL}
          target="_blank"
        >ScottyChat</Button>
      </Toolbar>
    </AppBar>
  )
}