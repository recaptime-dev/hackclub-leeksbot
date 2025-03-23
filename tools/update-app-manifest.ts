import * as fs from 'fs'
import { parse } from 'yaml'
import { WebClient } from '@slack/web-api';
import { config } from '../lib/env'
import { env } from 'process'

function detectEnvType() {
    if (config.env == "production") {
        return "prod"
    } else {
        return "dev"
    }
}

const client = new WebClient(config.slack.botToken)
const file = fs.readFileSync(`../manifests/${detectEnvType()}.yml`, 'utf8')
const manifest = parse(file)

(async () => {

    try {
        const app_id = (await client.auth.test()).app_id
    
        return await client.apps.manifest.update({
            manifest,
            app_id,
            token: env.SLACK_APP_MANIFEST_DEPLOY_TOKEN
        })
    } catch (error) {
        console.log(`Something went wrong, check app token or YAML manifest file`)
        process.exit(1)
    }
})