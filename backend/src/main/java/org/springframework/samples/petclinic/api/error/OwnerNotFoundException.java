package org.springframework.samples.petclinic.api.error;

public class OwnerNotFoundException extends RuntimeException {

    public OwnerNotFoundException(Integer ownerId) {
        super("Owner " + ownerId + " not found");
    }
}
