/**
 * List of all available provides
 * 
 * N.B. As statuspile.com is https the providers below have to use https also.
 */

export default [
  /** Statuspage providers - https://www.statuspage.io/ */
  {
    name: "BitBucket",
    type: "statuspage",
    url: "https://status.bitbucket.org"
  },
  {
    name: "Linode",
    type: "statuspage",
    url: "https://status.linode.com"
  },
  {
    name: "New Relic",
    type: "statuspage",
    url: "https://status.newrelic.com"
  },
  {
    name: "CloudFlare",
    type: "statuspage",
    url: "https://www.cloudflarestatus.com"
  },
  {
    name: "Digital Ocean",
    type: "statuspage",
    url: "https://status.digitalocean.com"
  },
  {
    name: "FreeAgent",
    type: "statuspage",
    url: "https://freeagent.statuspage.io"
  },
  {
    name: "LastPass",
    type: "statuspage",
    url: "https://status.lastpass.com"
  },
  {
    name: "Reddit",
    type: "statuspage",
    url: "https://reddit.statuspage.io"
  },
  {
    name: "Dynatrace",
    type: "statuspage",
    url: "https://dynatrace.status.io"
  },
  {
    name: "Datadog",
    type: "statuspage",
    url: "https://status.datadoghq.com"
  },
  {
    name: "Atlassian",
    type: "statuspage",
    url: "https://status.atlassian.com"
  },
  /** Status.io providers - https://status.io/ */
  {
    name: "Docker",
    type: "statusio",
    url: "https://status.docker.com"
  },
  /** Cachet providers - https://cachethq.io/ */
  {
    name: "Dogsbody Technology",
    type: "cachet",
    url: "https://status.dogsbody.com"
  },
  {
    name: "DNS Made Easy",
    type: "cachet",
    url: "https://dnsstatus.com"
  }
];
