<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from "vitepress/theme"

const leeksbot_maintainers = [
  {
    avatar: "https://cdn.andreijiroh.dev/archive/pfps/644129_spBC5UUB.png",
    name: "Andrei Jiroh Halili",
    title: "Lead developer",
    links: [
      { icon: "github", link: "https://github.com/ajhalili2006" }
    ]
  }
]
</script>

# Project maintainers

<VPTeamPage>
  <VPTeamMembers :members="leeksbot_maintainers" />
</VPTeamPage>

