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
    var event = factory.newEvent(NS,'ErrorMessageCreated');
    event.newMessage = myMessage.getFullyQualifiedIdentifier();
    event.creator = myMessage.creator;
    event.owner = myMessage.owner;
    event.errorType = myMessage.errorType;
    event.errorSeverity = myMessage.errorSeverity;
    emit(event);

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

    // This is the factory for creating instances of types.
    var factory = getFactory();
    var NS = 'org.securelog.mynetwork';
    var event = factory.newEvent(NS,'ErrorMessageOwnerUpdated');
    event.oldMessage = newTrans.oldMessage.getFullyQualifiedIdentifier();
    event.oldOwner = oldOwner;
    event.newOwner = newTrans.oldMessage.owner;
    emit(event);
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

    // This is the factory for creating instances of types.
    var factory = getFactory();
    var NS = 'org.securelog.mynetwork';
    var event = factory.newEvent(NS,'ErrorMessageStatusUpdated');
    event.oldMessage = newTrans.oldMessage.getFullyQualifiedIdentifier();
    event.oldStatus = oldStatus;
    event.newStatus = newTrans.oldMessage.errorStatus;
    emit(event);
}

/**
 * Update message subject transaction
 * @param {org.securelog.mynetwork.updateErrorMessageSeverity} newTrans
 * @transaction
 */
async function updateErrorMessageSeverity(newTrans) {
    // Validate input references
    var oldSeverity = newTrans.oldMessage.errorSeverity;

    newTrans.oldMessage.errorSeverity = newTrans.newSeverity;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry(newTrans.oldMessage.getFullyQualifiedType());
    // Update the asset in the asset registry.
    await assetRegistry.update(newTrans.oldMessage);

    // This is the factory for creating instances of types.
    var factory = getFactory();
    var NS = 'org.securelog.mynetwork';
    var event = factory.newEvent(NS,'ErrorMessageSeverityUpdated');
    event.oldMessage = newTrans.oldMessage.getFullyQualifiedIdentifier();
    event.oldSeverity = oldSeverity;
    event.newSeverity = newTrans.oldMessage.errorSeverity;
    emit(event);
}

