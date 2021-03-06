// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
'use strict'
/* !
    region header
    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import Tools from 'clientnode'
import {configuration as baseConfiguration, PluginAPI} from 'web-node'

import PreRender from './index'
import packageConfiguration from './package.json'
import {Configuration} from './type'
// endregion
describe('preRender', ():void => {
    // region mockup
    let configuration:Configuration
    beforeAll(async ():Promise<void> => {
        configuration = {
            ...Tools.copy(
                (await PluginAPI.loadAll(baseConfiguration)).configuration
            ),
            template: packageConfiguration.webNode.preRender
        } as unknown as Configuration
    })
    // endregion
    test('postConfigurationLoaded', async ():Promise<void> => {
        const testConfiguration:Configuration = Tools.extend(
            true,
            Tools.copy(configuration),
            {preRender: {renderAfterConfigurationUpdates: false}}
        )
        expect(PreRender.postConfigurationLoaded(testConfiguration, [], []))
            .resolves.toStrictEqual(testConfiguration)
    })
    // TODO test all methods
})
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
