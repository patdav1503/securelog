/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */
/**
 * Send public message transaction
 * @param {org.securelog.mynetwork.postErrorMessage} newMessage
 * @transaction
 */
async function postErrorMessage(newMessage) {
    var creator;
    // Validate input references
    if (newMessage.creator) {
        var lastName = newMessage.creator.lastName;
        creator = newMessage.creator;
    } else {
        creator = getCurrentParticipant();
    }
    var ownerlastname = newMessage.owner.lastName;
    console.log('publicMessage-->creator ' + newMessage.creator);
    console.log('publicMessage-->getCurrentParticipant ' + getCurrentParticipant());

    // This is the factory for creating instances of types.
    var factory = getFactory();
    var NS = 'org.securelog.mynetwork';

    var myMessage = factory.newResource(NS, 'ErrorMessage', newMessage.messageId);
    myMessage.creator = creator;
    myMessage.owner = newMessage.owner;
    myMessage.errorType = newMessage.errorType;
    if (newMessage.errorSeverity) {
        myMessage.errorSeverity = newMessage.errorSeverity;
    } else {
        myMessage.errorSeverity = 'INFO';
    }
    if (newMessage.errorStatus) {
        myMessage.errorStatus = newMessage.errorStatus;
    } else {
        myMessage.errorStatus = 'NEW';
    }
    myMessage.errorText = newMessage.errorText;

    await getAssetRegistry(NS + '.ErrorMessage')
        .then(function(messageRegistry) {
            // Add the message
            return messageRegistry.addAll([myMessage]);
        });

    // emit the event for message creation
    //var event = factory.newEvent(NS,'MessageCreated');
    //event.newMessage = myMessage.getFullyQualifiedIdentifier();
    //event.creator = myMessage.creator;
    //event.subject = myMessage.subject;
    //emit(event);
    //console.log('publicMessage-->event '+event);

}

/**
 * Change error message owner transaction
 * @param {org.securelog.mynetwork.updateErrorMessageOwner} newTrans
 * @transaction
 */
async function updateErrorMessageOwner(newTrans) {
    // Validate input references
    var oldOwner = newTrans.oldMessage.owner;
    var lastName = newTrans.newOwner.lastName;

    newTrans.oldMessage.owner = newTrans.newOwner;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry(newTrans.oldMessage.getFullyQualifiedType());
    // Update the asset in the asset registry.
    await assetRegistry.update(newTrans.oldMessage);

}

/**
 * Update message subject transaction
 * @param {org.securelog.mynetwork.updateErrorMessageStatus} newTrans
 * @transaction
 */
async function updateErrorMessageStatus(newTrans) {
    // Validate input references
    var oldStatus = newTrans.oldMessage.errorStatus;

    newTrans.oldMessage.errorStatus = newTrans.newStatus;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry(newTrans.oldMessage.getFullyQualifiedType());
    // Update the asset in the asset registry.
    await assetRegistry.update(newTrans.oldMessage);

}

